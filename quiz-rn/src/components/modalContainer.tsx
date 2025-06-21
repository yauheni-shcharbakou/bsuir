import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { View, Modal } from 'react-native';
import { useModal, useTheme } from '../hooks';
import { ModalName } from '../shared/enums';
import { baseModalStyles } from '../styles';
import SettingsModal from './modals/settingsModal';

const getModalContent = (name: ModalName, onClose: () => void) => {
  switch (name) {
    case ModalName.SETTINGS:
      return <SettingsModal onClose={onClose} />;
      defaut: return <></>;
  }
};

const ModalContainer: FC = () => {
  const { modalStyles } = useTheme();
  const { isOpened, modalName, closeModal } = useModal();

  const modalContent = getModalContent(modalName, closeModal);

  return (
    <Modal animationType="slide" transparent={true} visible={isOpened}>
      <View style={baseModalStyles.wrapper}>
        <View style={[baseModalStyles.container, modalStyles.container]}>
          {modalContent}
        </View>
      </View>
    </Modal>
  );
};

export default observer(ModalContainer);
