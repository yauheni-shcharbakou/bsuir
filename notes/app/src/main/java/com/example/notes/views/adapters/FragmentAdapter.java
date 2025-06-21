package com.example.notes.views.adapters;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentStatePagerAdapter;

import com.example.notes.views.fragments.FragmentAdd;
import com.example.notes.views.fragments.FragmentDel;
import com.example.notes.views.fragments.FragmentShow;
import com.example.notes.views.fragments.FragmentUpdate;

public class FragmentAdapter extends FragmentStatePagerAdapter {
    public FragmentAdapter(FragmentActivity activity) {
        super(activity.getSupportFragmentManager());
    }

    @Override
    public int getCount() {
        return TITLES.length;
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 1: return new FragmentAdd();
            case 2: return new FragmentDel();
            case 3: return new FragmentUpdate();
            default: return new FragmentShow();
        }
    }

    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        return position >= 0 && position < TITLES.length ? TITLES[position] : "Unknown";
    }

    private static CharSequence[] TITLES = {"Show", "Add", "Del", "Update"};
}
