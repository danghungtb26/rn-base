package com.splash

import android.R
import android.app.Activity
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.annotation.LayoutRes
import androidx.annotation.NonNull
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.module.annotations.ReactModule
import androidx.constraintlayout.widget.ConstraintLayout;



class SplashModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  companion object {
    private var mInitialized = false

    fun initSplash(@NonNull activity: Activity) {
      initSplash(activity, null)
    }

    fun initSplash(@NonNull activity: Activity, @LayoutRes id: Int?) {
      if (mInitialized) {
        return
      }
      mInitialized = true
      val layout = SplashView(activity.applicationContext)
      if(id != null) {
        layout.setLayout(id);
      }
      else {
        layout.setLayout(com.splash.R.layout.activity_splash)
      }
      val params = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT)
      layout.id = com.splash.R.id.splash_layout_id
      layout.visibility = View.VISIBLE
      activity.addContentView(layout, params)
    }
  }


  override fun getName(): String {
    return "Splash"
  }

  @ReactMethod
  fun hide(@NonNull duration: Float) {
    UiThreadUtil.runOnUiThread(Runnable {
      Log.e("Splash", com.splash.R.id.splash_layout_id.toString())
      val layout: ConstraintLayout? = reactApplicationContext.currentActivity?.findViewById(com.splash.R.id.splash_layout_id)
        layout?.visibility = View.GONE
    })
  }
//
  @ReactMethod
  fun show(@NonNull duration: Float) {
    UiThreadUtil.runOnUiThread(Runnable {
      val layout: ConstraintLayout? = reactApplicationContext.currentActivity?.findViewById(com.splash.R.id.splash_layout_id)
        ?: return@Runnable
      layout?.visibility = View.VISIBLE
    })
  }






}
