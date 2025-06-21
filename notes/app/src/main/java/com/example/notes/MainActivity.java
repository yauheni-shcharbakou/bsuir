package com.example.notes;

import android.os.Bundle;
import com.example.notes.repositories.NoteRepository;
import com.example.notes.views.adapters.FragmentAdapter;
import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;
import com.example.notes.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity {
    private ActivityMainBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        NoteRepository.getInstance(getApplicationContext());

        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        FragmentAdapter adapter = new FragmentAdapter(this);

        binding.viewPager.setAdapter(adapter);
        binding.viewPager.setCurrentItem(0);
    }

    @Override
    protected void onDestroy() {
        binding = null;
        NoteRepository.getInstance(getApplicationContext()).close();
        super.onDestroy();
    }

    @Override
    public void onBackPressed() {
        ViewPager pager = binding.viewPager;

        if (pager.getCurrentItem() > 0) {
            pager.setCurrentItem(pager.getCurrentItem() - 1, true);
        } else {
            finish();
        }
    }
}