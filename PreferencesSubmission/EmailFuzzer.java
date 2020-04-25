import java.util.Random;

/*
Fuzzer that generate random input for the email
 */

public class EmailFuzzer {
    /** Generate a random character*/
    public static char getRandomCharacter(int random_int) {
        if (random_int == 0) {
            return getRandomLowerCaseLetter();
        } else if (random_int == 1) {
            return getRandomUpperCaseLetter();
        } else if (random_int == 2) {
            return getRandomDigitCharacter();
        } else {
            return getRandomSymbolCharacter();
        }
    }

    /** Generate a random lowercase letter */
    public static char getRandomLowerCaseLetter() {
        //return getRandomCharacter('a', 'z');
        return (char) ('a' + Math.random() * ('z' - 'a' + 1));
    }

    /** Generate a random uppercase letter */
    public static char getRandomUpperCaseLetter() {
        return (char) ('A' + Math.random() * ('Z' - 'A' + 1));
    }

    /** Generate a random digit character */
    public static char getRandomDigitCharacter() {
        return (char) ('0' + Math.random() * ('9' - '0' + 1));
    }

    /** Generate a random symbol character */
    public static char getRandomSymbolCharacter() {
        return (char) ('\u0000' + Math.random() * ('\uFFFF' - '\u0000' + 1));
    }




    public static void main(String[] args) {
        String email_domain = "@mymail.sutd.edu.sg";

        Random rand = new Random();

        // Generate random length_of_fuzzer in range 1 to 100
        int length_of_fuzzer = rand.nextInt(100) + 1;

        //initialize empty fuzzer
        String fuzzer = "";

        for (int i = 0; i < length_of_fuzzer; i++) {

            int random_int = rand.nextInt(4);
            //System.out.println("rand int = " + random_int);
            fuzzer += getRandomCharacter(random_int);
        }

        System.out.println("fuzzer generated: " + fuzzer + email_domain);
    }
}


