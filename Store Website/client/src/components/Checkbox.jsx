import './checkbox.css'
export default function Checkbox () {

	return(
		<label className="toggler-wrapper style-1">
          <input type="checkbox" />
          <div className="toggler-slider">
            <div className="toggler-knob"></div>
          </div>
          <div className='badge'> style</div>
        </label>
	)
}