import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Card } from "@repo/ui/card";

async function getTransactions() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    const onRampTxns = await prisma.onRampTransaction.findMany({
        where: { userId },
        take: 10,
        orderBy: { startTime: 'desc' },
    });

    const sentTransfers = await prisma.p2pTransfer.findMany({
        where: { fromUserId: userId },
        take: 10,
        orderBy: { timestamp: 'desc' },
        include: { toUser: true }
    });

    const receivedTransfers = await prisma.p2pTransfer.findMany({
        where: { toUserId: userId },
        take: 10,
        orderBy: { timestamp: 'desc' },
        include: { fromUser: true }
    });

    // Combine and sort
    const allTxns = [
        ...onRampTxns.map(t => ({
            id: `onramp-${t.id}`,
            type: 'Add Money',
            amount: t.amount,
            status: t.status,
            time: t.startTime,
            details: `Provider: ${t.provider}`
        })),
        ...sentTransfers.map(t => ({
            id: `sent-${t.id}`,
            type: 'Sent',
            amount: -t.amount,
            status: 'Success',
            time: t.timestamp,
            details: `To: ${t.toUser.number}`
        })),
        ...receivedTransfers.map(t => ({
            id: `received-${t.id}`,
            type: 'Received',
            amount: t.amount,
            status: 'Success',
            time: t.timestamp,
            details: `From: ${t.fromUser.number}`
        }))
    ].sort((a, b) => b.time.getTime() - a.time.getTime());

    return allTxns;
}

export default async function() {
    const transactions = await getTransactions();

    return <div className="w-screen p-8">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transactions
        </div>
        <Card title="Transaction History">
            <div className="pt-2">
                {transactions.map(t => <div key={t.id} className="flex justify-between border-b border-slate-100 py-2">
                    <div>
                        <div className="font-semibold text-sm">
                            {t.type}
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                        <div className="text-slate-500 text-xs text-wrap">
                            {t.details}
                        </div>
                    </div>
                    <div className={`flex flex-col justify-center font-bold ${t.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {t.amount > 0 ? '+' : ''} Rs {t.amount / 100}
                    </div>
                </div>)}
                {transactions.length === 0 && <div className="text-center py-4 text-slate-500">
                    No transactions found
                </div>}
            </div>
        </Card>
    </div>
}