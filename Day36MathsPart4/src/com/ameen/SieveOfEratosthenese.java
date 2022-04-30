package com.ameen;

public class SieveOfEratosthenese {
    public static void main(String[] args) {
        // write your code here
        int n = 40;
        boolean [] values = new boolean[n + 1];

        sieve(n, values);
        for(int i = 2; i  <= n; i++){
            if(!values[i]) System.out.print(i + " ");
        }
    }

    static void sieve(int n, boolean [] priimes){
        for(int i = 2; i * i <= n; i++){
            if(!priimes[i]){
                for(int j = i * 2; j <= n; j+=i){
                    priimes[j] = true;
                }
            }
        }
    }
}
