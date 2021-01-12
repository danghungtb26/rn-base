package com.example.reactnativeexample;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.splash.SplashModule;

import javax.annotation.Nullable;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ExampleExample";
  }

  @Override
  public void onCreate(@Nullable Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);

    SplashModule.Companion.initSplash(this);

  }
}
