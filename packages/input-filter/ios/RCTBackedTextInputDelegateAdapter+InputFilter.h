//
//  RCTBackedTextInputDelegateAdapter+InputFilter.h
//  Pods
//
//  Created by HungDV on 21/05/2021.
//

#import <React/RCTBackedTextInputDelegateAdapter.h>

@interface RCTBackedTextFieldDelegateAdapter(PrivateMethods)

- (BOOL)textField:(__unused UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string;

@end
