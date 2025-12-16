#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
using namespace std;

struct Ramp {
    int x_start, y_start, x_end, y_end;
    int slope_type;
    int intercept;
    int min_x, max_x;
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int ramp_count;
    cin >> ramp_count;

    vector<Ramp> ramps(ramp_count);
    for (int i = 0; i < ramp_count; ++i) {
        cin >> ramps[i].x_start >> ramps[i].y_start >> ramps[i].x_end >> ramps[i].y_end;
        ramps[i].min_x = min(ramps[i].x_start, ramps[i].x_end);
        ramps[i].max_x = max(ramps[i].x_start, ramps[i].x_end);

        if (ramps[i].x_start == ramps[i].x_end) {
            ramps[i].slope_type = 0;
            ramps[i].intercept = 0;
        } else {
            int slope = (ramps[i].y_end - ramps[i].y_start) / (ramps[i].x_end - ramps[i].x_start);
            if (slope == 1) {
                ramps[i].slope_type = 1;
                ramps[i].intercept = ramps[i].y_start - ramps[i].x_start;
            } else {
                ramps[i].slope_type = -1;
                ramps[i].intercept = ramps[i].y_start + ramps[i].x_start;
            }
        }
    }

    int ball_x, ball_y;
    long long energy;
    cin >> ball_x >> ball_y >> energy;

    while (ball_y > 0) {
        bool moved = false;
        vector<int> current_ramps;
        int slide_idx = -1;
        int slide_dir = 0;

        for (int i = 0; i < ramp_count; ++i) {
            if (ball_x < ramps[i].min_x || ball_x > ramps[i].max_x) continue;

            bool on_ramp = false;
            if (ramps[i].slope_type == 1 && ball_y - ball_x == ramps[i].intercept) on_ramp = true;
            if (ramps[i].slope_type == -1 && ball_y + ball_x == ramps[i].intercept) on_ramp = true;

            if (on_ramp) {
                current_ramps.push_back(i);
                if (ramps[i].slope_type == 1 && ball_x > ramps[i].min_x) {
                    slide_idx = i;
                    slide_dir = -1;
                }
                if (ramps[i].slope_type == -1 && ball_x < ramps[i].max_x) {
                    slide_idx = i;
                    slide_dir = 1;
                }
            }
        }

        if (current_ramps.size() > 1) {
            long long unlock_cost = (long long)ball_x * ball_y;
            if (energy >= unlock_cost) {
                energy -= unlock_cost;
                if (slide_idx != -1 && energy > 0) {
                    ball_x += slide_dir;
                    ball_y--;
                    energy--;
                    moved = true;
                } else if (slide_idx != -1 && energy == 0) {
                    break;
                }
            } else {
                break;
            }
        } else if (slide_idx != -1) {
            if (energy > 0) {
                ball_x += slide_dir;
                ball_y--;
                energy--;
                moved = true;
            } else {
                break;
            }
        }

        if (!moved) {
            int next_y = 0;
            for (int i = 0; i < ramp_count; ++i) {
                if (ball_x >= ramps[i].min_x && ball_x <= ramps[i].max_x) {
                    int intersection_y = -1;
                    if (ramps[i].slope_type == 1) intersection_y = ball_x + ramps[i].intercept;
                    else if (ramps[i].slope_type == -1) intersection_y = ramps[i].intercept - ball_x;

                    if (intersection_y != -1 && intersection_y < ball_y && intersection_y > next_y) {
                        next_y = intersection_y;
                    }
                }
            }
            if (ball_y == next_y) {
                break;
            }
            ball_y = next_y;
            if (ball_y == 0) {
                break;
            }
        }
    }

    cout << ball_x << " " << ball_y;
    return 0;
}
