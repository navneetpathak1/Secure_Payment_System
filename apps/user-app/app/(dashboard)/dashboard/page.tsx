import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

async function getBalance(userId: number) {
    const balance = await prisma.balance.findFirst({
        where: {
            userId: userId
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions(userId: number) {
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: userId
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !session.user.id) {
        redirect('/signin');
    }

    const userId = Number(session.user.id);
    
    const balance = await getBalance(userId);
    const transactions = await getOnRampTransactions(userId);

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Dashboard
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
            </div>
            <div>
                <OnRampTransactions transactions={transactions} />
            </div>
        </div>
    </div>
}