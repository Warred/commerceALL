import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './adresse.reducer';
import { IAdresse } from 'app/shared/model/adresse.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAdresseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AdresseDetail = (props: IAdresseDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { adresseEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Adresse [<b>{adresseEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="numero">Numero</span>
          </dt>
          <dd>{adresseEntity.numero}</dd>
          <dt>
            <span id="rue">Rue</span>
          </dt>
          <dd>{adresseEntity.rue}</dd>
          <dt>
            <span id="codePostal">Code Postal</span>
          </dt>
          <dd>{adresseEntity.codePostal}</dd>
          <dt>
            <span id="ville">Ville</span>
          </dt>
          <dd>{adresseEntity.ville}</dd>
        </dl>
        <Button tag={Link} to="/adresse" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/adresse/${adresseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ adresse }: IRootState) => ({
  adresseEntity: adresse.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdresseDetail);
