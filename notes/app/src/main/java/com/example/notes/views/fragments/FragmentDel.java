package com.example.notes.views.fragments;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.notes.databinding.FragmentDelBinding;
import com.example.notes.external.UpdateEmitter;
import com.example.notes.repositories.NoteRepository;

public class FragmentDel extends Fragment implements View.OnClickListener {
    private NoteRepository repository;
    private FragmentDelBinding binding;

    public FragmentDel() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(
        LayoutInflater inflater,
        ViewGroup container,
        Bundle savedInstanceState
    ) {
        binding = FragmentDelBinding.inflate(getLayoutInflater(), container, false);
        repository = NoteRepository.getInstance(requireContext());

        binding.deleteSubmit.setOnClickListener(this);
        return binding.getRoot();
    }

    @Override
    public void onDestroyView() {
        binding = null;
        super.onDestroyView();
    }

    @Override
    public void onClick(View v) {
        if (v.getId() != binding.deleteSubmit.getId()) {
            return;
        }

        try {
            int id = Integer.parseInt(binding.deleteIdInput.getText().toString());
            Boolean isExists = repository.isExists(id);

            if (!isExists) {
                Toast.makeText(requireContext(), "Error: no note with that id", Toast.LENGTH_LONG).show();
                clearForm();
                return;
            }

            repository.delete(id);
            Toast.makeText(requireContext(), "Note deleted", Toast.LENGTH_LONG).show();
            clearForm();
            UpdateEmitter.emit();
        } catch (Exception exception) {
            Toast.makeText(requireContext(), "Unknown error", Toast.LENGTH_LONG).show();
        }
    }

    private void clearForm() {
        binding.deleteIdInput.setText("");
    }
}