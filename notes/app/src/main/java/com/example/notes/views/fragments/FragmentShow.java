package com.example.notes.views.fragments;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.notes.databinding.FragmentShowBinding;
import com.example.notes.external.UpdateEmitter;
import com.example.notes.repositories.NoteRepository;
import com.example.notes.views.adapters.NoteListAdapter;

public class FragmentShow extends Fragment implements UpdateEmitter.Observer {
    private FragmentShowBinding binding;
    private NoteRepository repository;

    public FragmentShow() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(
        LayoutInflater inflater,
        ViewGroup container,
        Bundle savedInstanceState
    ) {
        binding = FragmentShowBinding.inflate(getLayoutInflater(), container, false);
        repository = NoteRepository.getInstance(requireContext());

        UpdateEmitter.subscribe(this);
        refreshList();
        return binding.getRoot();
    }

    @Override
    public void onDestroyView() {
        binding = null;
        UpdateEmitter.unsubscribe(this);
        super.onDestroyView();
    }

    private void refreshList() {
        binding.list.setAdapter(new NoteListAdapter(getContext(), repository.getAll()));
    }

    @Override
    public void react() {
        refreshList();
    }
}