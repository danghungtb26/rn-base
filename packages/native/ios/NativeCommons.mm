//
//  GetSizeManager.m
//  RNReAnimatedExample
//
//  Created by HungDV on 8/25/20.
//

#import "NativeCommons.h"
#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>
#import <jsi/jsi.h>
#import <sys/utsname.h>
#import "YeetJSIUtils.h"

using namespace facebook::jsi;
using namespace std;


@implementation NativeCommonManager

@synthesize bridge = _bridge;
@synthesize methodQueue = _methodQueue;

GLfloat insetBottom = 0;
GLfloat insetTop = 0;
GLfloat insetRight = 0;
GLfloat insetLeft = 0;

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (void)setBridge:(RCTBridge *)bridge {
    _bridge = bridge;
    _setBridgeOnMainQueue = RCTIsMainQueue();
    if(RCTIsIPhoneX()) {
      insetBottom = 34;
      insetTop = 44;
    }
    dispatch_async(dispatch_get_main_queue(), ^{
        NSArray<UIWindow *> *window = [UIApplication sharedApplication].windows;
        
        @try {
            insetBottom = window[0].safeAreaInsets.bottom;
            insetTop = window[0].safeAreaInsets.top;
            insetLeft = window[0].safeAreaInsets.right;
            insetRight = window[0].safeAreaInsets.left;
        } @catch(NSException *e) {
          
        } @finally {
          
        }
    });
    
    
    [self installLibrary];
}

- (void)installLibrary {
    
    RCTCxxBridge *cxxBridge = (RCTCxxBridge *)self.bridge;
    
    if (!cxxBridge.runtime) {
        
        /**
         * This is a workaround to install library
         * as soon as runtime becomes available and is
         * not recommended. If you see random crashes in iOS
         * global.xxx not found etc. use this.
         */
        
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 0.001 * NSEC_PER_SEC),
                       dispatch_get_main_queue(), ^{
            /**
             When refreshing the app while debugging, the setBridge
             method is called too soon. The runtime is not ready yet
             quite often. We need to install library as soon as runtime
             becomes available.
             */
            [self installLibrary];
            
        });
        return;
    }
    
    install(*(facebook::jsi::Runtime *)cxxBridge.runtime, self);
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

- (NSDictionary *) getAreaInset {
    return @{
      @"top": @(insetTop),
      @"bottom": @(insetBottom),
      @"right": @(insetRight),
      @"left": @(insetLeft),
      @"is_iphone_x": @(RCTIsIPhoneX() || insetBottom > 0)
    };
}

- (NSDictionary *)constantsToExport
{
    return [self getAreaInset];
}

static void install(jsi::Runtime &jsiRuntime, NativeCommonManager *common) {
    auto getSafeAreaInset = Function::createFromHostFunction(jsiRuntime,
                                                             PropNameID::forAscii(jsiRuntime,
                                                                                  "getSafeAreaInset"),
                                                             0,
                                                             [common](Runtime &runtime,
                                                                      const Value &thisValue,
                                                                      const Value *arguments,
                                                                      size_t count) -> Value {
           
           
//           NSDictionary *inset =
        return Value(runtime, convertNSDictionaryToJSIObject(runtime, [common getAreaInset]));
       });
    jsi::Object result(jsiRuntime);
    result.setProperty(jsiRuntime, "getSafeAreaInset", getSafeAreaInset);
    
    
    jsiRuntime.global().setProperty(jsiRuntime, "rnBaseNativeCommons", result);
}


@end

