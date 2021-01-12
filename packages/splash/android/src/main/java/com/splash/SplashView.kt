package com.splash

import android.content.Context
import androidx.annotation.LayoutRes
import androidx.constraintlayout.widget.ConstraintLayout;

class SplashView(context: Context) : ConstraintLayout(context) {
  fun setLayout(@LayoutRes id: Int) {
    inflate(context, id, this)
  }

}
