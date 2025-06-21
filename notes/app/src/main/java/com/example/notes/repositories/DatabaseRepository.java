package com.example.notes.repositories;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public abstract class DatabaseRepository extends SQLiteOpenHelper {
    protected static final String TABLE = "notes";
    protected static final String COLUMN_ID = "id";
    protected static final String COLUMN_TEXT = "text";

    protected static final String SQL_CREATE_TABLE = String.format(
        "CREATE TABLE %s (%s INTEGER PRIMARY KEY, %s TEXT)",
        TABLE,
        COLUMN_ID,
        COLUMN_TEXT
    );

    protected static final String SQL_DROP_TABLE = String.format(
        "DROP TABLE IF EXISTS %s",
        TABLE
    );

    protected static final int DATABASE_VERSION = 1;
    protected static final String DATABASE_NAME = "Notes.db";

    protected DatabaseRepository(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(SQL_CREATE_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL(SQL_DROP_TABLE);
        onCreate(db);
    }

    @Override
    public void onDowngrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        onUpgrade(db, oldVersion, newVersion);
    }
}
