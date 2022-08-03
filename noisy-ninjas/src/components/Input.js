import React from 'react'
import '../style/Input.css'
import ReactTooltip from 'react-tooltip'
export function Input(props) {
  const {
    onPress,
    placeholder = ' ',
    onChange,
    type = 'text',
    className = '',
    style,
    icon,
    tooltipId,
    tooltipBody,
  } = props
  return (
    <div className={`input-component-wrapper`}>
      <input
        className={`input-component ${className}`}
        type={type}
        style={{ ...style }}
        onClick={onPress}
        placeholder={placeholder}
        onChange={onChange}
      />
      {icon && (
        <>
          {tooltipBody && tooltipId && (
            <ReactTooltip id={tooltipId} type="warning" effect="solid">
              {tooltipBody}
            </ReactTooltip>
          )}
          <div data-tip data-for={tooltipId} className={'input-icon'}>
            {' '}
            <img
              alt={"input-icon"}
              src={icon}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
        </>
      )}
    </div>
  )
}
