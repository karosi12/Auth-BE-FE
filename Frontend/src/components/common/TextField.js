import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

const TextField = ({
  name,
  type,
  value,
  onClick,
  onChange,
  errors,
  label,
  register,
  children,
  disabled,
}) => {
  return (
    <FormGroup>
      <Label className="authFormLabel">{label}</Label>

      {type === 'select' ? (
        <Input
          name={name}
          type={type}
          value={value}
          innerRef={register}
          style={{ fontFamily: 'Poppins' }}
        >
          {children}
        </Input>
      ) : (
        <>
          <Input
            name={name}
            type={type}
            value={value}
            onClick={onClick}
            onChange={onChange}
            innerRef={register}
            disabled={disabled}
          />
        </>
      )}
      {errors && (
        <>
          <p className="authErrorText text-danger">
            &nbsp;
            {errors.message}
          </p>
        </>
      )}
    </FormGroup>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errors: PropTypes.shape({
    message: PropTypes.string
  }),
  onClick: PropTypes.func,
  register: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export default TextField;
