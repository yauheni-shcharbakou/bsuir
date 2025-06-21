package com.example.notes.views.fragments;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.notes.databinding.FragmentUpdateBinding;
import com.example.notes.external.UpdateEmitter;
import com.example.notes.repositories.NoteRepository;

public class FragmentUpdate extends Fragment implements View.OnClickListener {
    private NoteRepository repository;
    private FragmentUpdateBinding binding;

    public FragmentUpdate() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(
        LayoutInflater inflater,
        ViewGroup container,
        Bundle savedInstanceState
    ) {
        binding = FragmentUpdateBinding.inflate(getLayoutInflater(), container, false);
        repository = NoteRepository.getInstance(requireContext());

        binding.updateSubmit.setOnClickListener(this);
        return binding.getRoot();
    }

    @Override
    public void onDestroyView() {
        binding = null;
        super.onDestroyView();
    }

    @Override
    public void onClick(View v) {
        if (v.getId() != binding.updateSubmit.getId()) {
            return;
        }

        try {
            int id = Integer.parseInt(binding.updateIdInput.getText().toString());
            String text = binding.updateTextInput.getText().toString();

            if (text.isEmpty() || text.trim().isEmpty()) {
                Toast.makeText(requireContext(), "Error: text is empty", Toast.LENGTH_LONG).show();
                clearForm();
                return;
            }

            Boolean isExists = repository.isExists(id);

            if (!isExists) {
                Toast.makeText(requireContext(), "Error: no note with that id", Toast.LENGTH_LONG).show();
                clearForm();
                return;
            }

            repository.update(id, text);
            Toast.makeText(requireContext(), "Note updated", Toast.LENGTH_LONG).show();
            clearForm();
            UpdateEmitter.emit();
        } catch (Exception exception) {
            Toast.makeText(requireContext(), "Unknown error", Toast.LENGTH_LONG).show();
        }
    }

    private void clearForm() {
        binding.updateIdInput.setText("");
        binding.updateTextInput.setText("");
    }
}