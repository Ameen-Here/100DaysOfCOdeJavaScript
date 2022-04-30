package com.ameen;

public class Main {

    public static void main(String[] args) {
	// write your code here
        System.out.println("Is 5 prime? " + isPrime(5));
    }

    static boolean isPrime(int n){
        if(n <= 1) return false;

        int c = 2;
        while(c * c <= n){
            if(n % c == 0) return false;
            c++;
        }
        return true;
    }
}
