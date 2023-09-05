import * as React from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';

const JournalScreen = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'black', padding: 20,margin:10};

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Create you Journl</Text>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </PaperProvider>
  );
};

export default JournalScreen;