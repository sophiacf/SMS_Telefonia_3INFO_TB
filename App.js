import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as SMS from 'expo-sms';

export default function App() {

  const [numero, setNumero] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [historico, setHistorico] = useState([]);

  function limparNumero(texto) {
    return texto.replace(/\D/g, '');
  }

  function numeroValido() {
    const limpo = limparNumero(numero);
    if (limpo.length < 8) {
      Alert.alert('Número inválido', 'Digite um número com pelo menos 8 dígitos.');
      return false;
    }
    return true;
  }

  function registrar(acao){
    const hora = new date().toLocaleTimeString('pt-BR',
      {
        hour: '2-digit',
        minute: '2-digit'
      }
    );
    setHistorico([`${hora} - ${acao} para ${numero}`, ...historico])
  }


  async function ligar () {
    if (numeroValido()) {
      try {
        const url = `tel: ${limparNumero(numero)}`;
        const podeAbrir = await Linking.canOpenURL(url);

        if (podeAbrir) {
          await Linking.openURL(url);
          registrar("Ligação");
          //fazer um registro da ligação para o usuário
        }

        else {
          Alert.alert ("Erro", "Este aparelho não consegue fazer ligações")
        }

      } catch (error) {

      } 
    }
  }
  

  async function enviarSMS () {
    if (numeroValido()) {
      if (mensagem.trim() === "") {
        Alert.alert(
          "Mensagem vazia",
          "Escreva alguma coisa antes de enviar."
        );
        return;
       }

       const disponivel = await SMS.isAvaliableAsync();
       if (!disponivel) {
        Alert.alert ("Aviso", "Este aparelho não consegue fazer envio de sms.");
        return;
       }

       try{
        const { result } = await SMS.sendSMSAsync (
          [limparNumero(numero)],
          mensagem
        );
       } catch (error) {

       }
    }
  }

  return (
    <View>

    </View>
  );
}