import React, { useCallback, useState, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { getValidationErrors } from '../../utils/getValidationErrors';
import { Input, Button } from '../../components/FormInputs';

import logoImg from '../../assets/logo.png';

import { Loading } from '../../libs/Lottie/Loading';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      setIsLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });
      return setTimeout(async () => {
        setIsLoading(false);
        await schema.validate(data, {
          abortEarly: false,
        });
        navigation.navigate('Map');
      }, 1000);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        return formRef.current?.setErrors(errors);
      }

      setIsLoading(false);
      return Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, verifique seus dados',
      );
    }
  }, []);

  const submitForm = useCallback(() => formRef.current?.submitForm(), []);

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
            {isLoading && <Loading />}
            <Image source={logoImg} />
            <View>
              <Title> Entre na sua conta </Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                textContentType="newPassword"
                onSubmitEditing={() => {
                  submitForm();
                }}
              />
            </Form>
            <Button onPress={() => submitForm()}>Entrar</Button>
            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>

        <CreateAccountButton
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          <Icon name="log-in" size={20} color="#cccccc" />
          <CreateAccountText> Crie uma conta </CreateAccountText>
        </CreateAccountButton>
      </KeyboardAvoidingView>
    </>
  );
};

export { SignIn };
