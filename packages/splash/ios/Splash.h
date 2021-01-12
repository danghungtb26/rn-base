//
//  RNSplash.h
//  RNReAnimatedExample
//
//  Created by HungDV on 9/16/20.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTRootView.h>

NS_ASSUME_NONNULL_BEGIN

@interface Splash : NSObject <RCTBridgeModule>

+ (void)initWithStoryboard:(NSString * _Nonnull)storyboardName
                  rootView:(RCTRootView * _Nonnull)rootView;


@end

NS_ASSUME_NONNULL_END
