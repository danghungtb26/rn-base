//
//  GetSizeManager.m
//  RNReAnimatedExample
//
//  Created by HungDV on 8/25/20.
//

#import "NativeCommons.h"
//#import <React/RCTDefines.h>

@implementation NativeCommonManager

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

static BOOL RCTIsIPhoneX()
{
  static BOOL isIPhoneX = NO;
  static dispatch_once_t onceToken;

  dispatch_once(&onceToken, ^{
//    RCTAssertMainQueue();

    CGSize screenSize = [UIScreen mainScreen].nativeBounds.size;
    CGSize iPhoneXScreenSize = CGSizeMake(1125, 2436);
    CGSize iPhoneXMaxScreenSize = CGSizeMake(1242, 2688);
    CGSize iPhoneXRScreenSize = CGSizeMake(828, 1792);

    isIPhoneX = CGSizeEqualToSize(screenSize, iPhoneXScreenSize) ||
        CGSizeEqualToSize(screenSize, iPhoneXMaxScreenSize) || CGSizeEqualToSize(screenSize, iPhoneXRScreenSize);
  });

  return isIPhoneX;
}

- (NSDictionary *)constantsToExport
{
  NSArray<UIWindow *> *window = [UIApplication sharedApplication].windows;
  
  GLfloat bottom = 0;
  GLfloat top = 0;
  
  if(RCTIsIPhoneX()) {
    bottom = 34;
    top = 44;
  }
  
  @try {
    if (@available(iOS 11.0, *)) {
      bottom = window[0].safeAreaInsets.bottom;
      top = window[0].safeAreaInsets.top;
    } else {
      bottom = window[0].rootViewController.bottomLayoutGuide.length;
      top = window[0].rootViewController.topLayoutGuide.length;
    }
  } @catch(NSException *e) {
    
  } @finally {
    
  }
  
  
  return @{
    @"top": @(top),
    @"bottom": @(bottom),
    @"is_iphone_x": @(RCTIsIPhoneX() || bottom > 0)
  };
}

@end
