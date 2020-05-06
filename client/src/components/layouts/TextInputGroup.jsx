import React from 'react'
import PropTypes from 'prop-types'
import classnames from "classnames"

export default function TextInputGroup({
    name,
    label,
    value,
    placeholder,
    onChange,
    type,
    error
}) {
  return (
    <div className="form-group">
        
        <input 
            type={type} 
            className= {
                classnames("form-control form-control-sm",
                {
                    "is-invalid": error
                }
            )}
            placeholder= {placeholder}
            name = {name}
            value = {value}
            onChange = {onChange}
            error = {error}
            
            />
        { error && (
                <div className="invalid-feedback">{error}</div>
            )
        }
        
    </div>
  );
}

TextInputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired || PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
}

TextInputGroup.defaultProps = {
    type: "text"
}
