package com.example.notes.views.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

import com.example.notes.databinding.NoteCardBinding;
import com.example.notes.views.models.Note;

import java.util.List;

public class NoteListAdapter extends BaseAdapter {
    private final Context context;
    private final List<Note> items;

    public NoteListAdapter(
        Context context,
        List<Note> items
    ) {
        this.context = context;
        this.items = items;
    }

    public int getCount() {
        return items.size() ;
    }

    public Object getItem(int arg0) {
        return items.get(arg0);
    }

    public long getItemId(int arg0) {
        return 0;
    }

    public View getView(int arg0, View arg1, ViewGroup arg2) {
        final Note note = items.get(arg0);

        NoteCardBinding layout = NoteCardBinding.inflate(
            LayoutInflater.from(context),
            arg2,
            false
        );

        layout.idField.setText(String.format("Id: %s", note.getId()));
        layout.textField.setText(String.format("Text: %s", note.getText()));

        return layout.getRoot();
    }
}
