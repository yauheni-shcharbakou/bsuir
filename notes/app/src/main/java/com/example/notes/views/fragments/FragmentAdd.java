package com.example.notes.views.fragments;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.notes.databinding.FragmentAddBinding;
import com.example.notes.external.UpdateEmitter;
import com.example.notes.repositories.NoteRepository;

public class FragmentAdd extends Fragment implements View.OnClickListener {
    private NoteRepository repository;
    private FragmentAddBinding binding;

    public FragmentAdd() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(
        LayoutInflater inflater,
        ViewGroup container,
        Bundle savedInstanceState
    ) {
        binding = FragmentAddBinding.inflate(getLayoutInflater(), container, false);
        repository = NoteRepository.getInstance(requireContext());

        binding.createSubmit.setOnClickListener(this);
        return binding.getRoot();
    }

    @Override
    public void onDestroyView() {
        binding = null;
        super.onDestroyView();
    }

    @Override
    public void onClick(View v) {
        if (v.getId() != binding.createSubmit.getId()) {
            return;
        }

        try {
            String text = binding.createTextInput.getText().toString();

            if (text.isEmpty() || text.trim().isEmpty()) {
                Toast.makeText(requireContext(), "Error: note text is empty", Toast.LENGTH_LONG).show();
                clearForm();
                return;
            }

            repository.create(text);
            Toast.makeText(requireContext(), "Note created", Toast.LENGTH_LONG).show();
            clearForm();
            UpdateEmitter.emit();
        } catch (Exception exception) {
            Toast.makeText(requireContext(), "Unknown error", Toast.LENGTH_LONG).show();
        }
    }

    private void clearForm() {
        binding.createTextInput.setText("");
    }
}