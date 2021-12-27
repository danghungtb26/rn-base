package com.rnbasenative;

import android.app.Activity;
import android.os.Build;
import android.util.Log;
import android.view.View;
import android.view.WindowInsets;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.PixelUtil;

import java.util.HashMap;
import java.util.Map;

@ReactModule(name = RNBaseNativeJsiModule.name)
public class RNBaseNativeJsiModule extends ReactContextBaseJavaModule {
  public static final String name = "RNBaseNativeJsiModule";
  static {
    System.loadLibrary("cpp-rn-base-native");
  }

  public RNBaseNativeJsiModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return name;
  }

  private native void nativeInstall(long jsi);

  public void installLib(JavaScriptContextHolder reactContext) {

    if (reactContext.get() != 0) {
      this.nativeInstall(
        reactContext.get()
      );
    } else {
      Log.e("SimpleJsiModule", "JSI Runtime is not available in debug mode");
    }

  }

  public SafeAreaInset getSafeAreaInsets() {
    final SafeAreaInset constants = new SafeAreaInset();

    if (getCurrentActivity() != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      final Activity activity = getCurrentActivity();
      final View view = activity.getWindow().getDecorView();
      final WindowInsets insets = view.getRootWindowInsets();
      constants.safeAreaInsetsBottom = (double) PixelUtil.toDIPFromPixel(insets.getSystemWindowInsetBottom());
      constants.safeAreaInsetsLeft = (double) PixelUtil.toDIPFromPixel(insets.getSystemWindowInsetLeft());
      constants.safeAreaInsetsRight =(double) PixelUtil.toDIPFromPixel(insets.getSystemWindowInsetRight());
      constants.safeAreaInsetsTop = (double) PixelUtil.toDIPFromPixel(insets.getSystemWindowInsetTop());
    } else {
      constants.safeAreaInsetsBottom =(double) 0f;
      constants.safeAreaInsetsLeft =(double) 0f;
      constants.safeAreaInsetsRight =(double) 0f;
      constants.safeAreaInsetsTop = 0.0;
    }

    return constants;
  }
}

