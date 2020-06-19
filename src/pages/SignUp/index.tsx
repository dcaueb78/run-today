import React, { useRef, useCallback } from 'react';
import {
  Image,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { Input, Button } from '../../components/FormInputs';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInText,
} from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const submitForm = useCallback(() => formRef.current?.submitForm(), []);
  const focusNextInput = useCallback(
    (inputRef) => inputRef.current?.focus(),
    [],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title> Crie sua conta </Title>
            </View>
            <Form ref={formRef} onSubmit={(data) => console.log(data)}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => focusNextInput(emailInputRef)}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => focusNextInput(passwordInputRef)}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  submitForm();
                }}
              />
            </Form>
            <Button onPress={() => submitForm()}>Criar conta</Button>
          </Container>
        </ScrollView>

        <BackToSignInButton
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={20} color="#cccccc" />
          <BackToSignInText> Entre na sua conta </BackToSignInText>
        </BackToSignInButton>
      </KeyboardAvoidingView>
    </>
  );
};

export { SignUp };
