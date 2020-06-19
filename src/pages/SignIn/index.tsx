import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Input, Button } from '../../components/FormInputs';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountText,
} from './styles';

const SignIn: React.FC = () => {
  return (
    <>
      <Container>
        <Image source={logoImg} />
        <Title> Entre na sua conta </Title>

        <Input name="email" icon="mail" placeholder="E-mail" />
        <Input name="email" icon="lock" placeholder="Senha" />

        <Button
          onPress={() => {
            console.log('irra');
          }}
        >
          Entrar
        </Button>
        <ForgotPassword onPress={() => {}}>
          <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
        </ForgotPassword>
      </Container>

      <CreateAccountButton onPress={() => {}}>
        <Icon name="log-in" size={20} color="#cccccc" />
        <CreateAccountText> Crie uma conta </CreateAccountText>
      </CreateAccountButton>
    </>
  );
};

export { SignIn };
