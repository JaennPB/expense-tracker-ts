import React from "react";
import { Button, Modal } from "native-base";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteAccModal: React.FC<Props> = ({
  isOpen,
  children,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Content w="90%">
        <Modal.Header
          bg="darkBlue.700"
          _text={{ color: "white", fontSize: "lg" }}
          borderBottomWidth={0}
          p={5}
        >
          Please enter your password to delete account and data
        </Modal.Header>
        <Modal.Body bg="darkBlue.700" p={5}>
          {children}
        </Modal.Body>
        <Modal.Footer bg="darkBlue.700" borderTopWidth={0} p={5}>
          <Button
            variant="ghost"
            onPress={onCancel}
            _text={{ color: "white" }}
            mr={5}
          >
            Cancel
          </Button>
          <Button
            _text={{ color: "white" }}
            onPress={onConfirm}
            bg="danger.400"
          >
            Delete account and data
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteAccModal;