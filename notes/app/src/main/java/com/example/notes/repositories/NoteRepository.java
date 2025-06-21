package com.example.notes.repositories;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.example.notes.views.models.Note;

import java.util.ArrayList;

public class NoteRepository extends DatabaseRepository {
    private static NoteRepository INSTANCE = null;

    public static NoteRepository getInstance(Context context) {
        if (INSTANCE != null) return INSTANCE;

        INSTANCE = new NoteRepository(context);
        return INSTANCE;
    }

    private NoteRepository(Context context) {
        super(context);
    }

    public ArrayList<Note> getAll() {
        SQLiteDatabase db = getReadableDatabase();
        Cursor cursor = db.query(TABLE, null, null, null, null, null, null);
        ArrayList<Note> list = new ArrayList<Note>();

        cursor.moveToFirst();

        for (int i = 0; i < cursor.getCount(); i++) {
            list.add(new Note(cursor.getInt(0), cursor.getString(1)));
            cursor.moveToNext();
        }

        cursor.close();
        db.close();

        return list;
    }

    public Boolean isExists(int id) {
        String[] filterArgs = {String.valueOf(id)};
        SQLiteDatabase db = getReadableDatabase();
        Cursor cursor = db.query(TABLE, null, "id = ?", filterArgs, null, null, null);

        Boolean isExists = cursor.getCount() != 0;

        cursor.close();
        db.close();

        return isExists;
    }

    public void create(String text) {
        SQLiteDatabase db = getWritableDatabase();
        ContentValues cv = new ContentValues();

        cv.put(COLUMN_TEXT, text);

        db.insert(TABLE, null, cv);
        db.close();
    }

    public void update(int id, String text) {
        SQLiteDatabase db = getWritableDatabase();
        ContentValues cv = new ContentValues();
        String[] filterArguments = {String.valueOf(id)};

        cv.put(COLUMN_TEXT, text);

        db.update(TABLE, cv, "id = ?", filterArguments);
        db.close();
    }

    public void delete(int id) {
        SQLiteDatabase db = getWritableDatabase();
        db.delete(TABLE, String.format("id = %s", id), null);
        db.close();
    }
}
