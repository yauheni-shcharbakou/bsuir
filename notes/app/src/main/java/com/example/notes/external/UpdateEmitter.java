package com.example.notes.external;

import java.util.ArrayList;

public class UpdateEmitter {
    private static final ArrayList<Observer> observers = new ArrayList<>();

    public static void emit() {
        for (int i = 0; i < observers.size(); i++) {
            try {
                observers.get(i).react();
            } catch (Exception exception) {
                System.out.println("Something bag with Observers");
            }
        }
    }

    public static void subscribe(Observer observer) {
        observers.add(observer);
    }

    public static void unsubscribe(Observer observer) {
        observers.remove(observer);
    }

    public interface Observer {
        void react();
    }
}
