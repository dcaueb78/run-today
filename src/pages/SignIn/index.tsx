import React from 'react';
import { Image } from 'react-native';
import { Input, Button } from '../../components/FormInputs';

import logoImg from '../../assets/logo.png';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
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
    </Container>
  );
};

export { SignIn };