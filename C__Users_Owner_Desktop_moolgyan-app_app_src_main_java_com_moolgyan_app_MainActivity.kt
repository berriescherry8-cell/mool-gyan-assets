package com.moolgyan.app

import android.os.Bundle
import com.google.androidbrowserhelper.trusted.LauncherActivity

class MainActivity : LauncherActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Ye library apne aap Manifest se URL utha legi aur fullscreen mein kholegi
    }
}