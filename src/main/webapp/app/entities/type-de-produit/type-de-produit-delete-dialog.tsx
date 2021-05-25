import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ITypeDeProduit } from 'app/shared/model/type-de-produit.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './type-de-produit.reducer';

export interface ITypeDeProduitDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TypeDeProduitDeleteDialog = (props: ITypeDeProduitDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/type-de-produit');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.typeDeProduitEntity.id);
  };

  const { typeDeProduitEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Confirm delete operation</ModalHeader>
      <ModalBody id="commerceApp.typeDeProduit.delete.question">Are you sure you want to delete this TypeDeProduit?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-typeDeProduit" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ typeDeProduit }: IRootState) => ({
  typeDeProduitEntity: typeDeProduit.entity,
  updateSuccess: typeDeProduit.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TypeDeProduitDeleteDialog);
