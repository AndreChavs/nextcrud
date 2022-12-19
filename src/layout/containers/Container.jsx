import styles from '/styles/modules/container.module.css'

const Container = ({ children, className, style }) => {
  const { container } = styles //recebe a classe de estilo interna desestruturada
  const componentStyles = [container, className] //recebe a classe de estilo interna e externa
  // console.log(componentStyles) // desse modo será mostrado no console ['classInterna','classExterna1 classExterna2']
  //o metodo join() irá junta-las em uma unica arrey de String, subistituindo a ',' por '<espaço>'
  // const text = componentStyles.join(' ')

  return (
    <div className={componentStyles.join(' ')} style={style}>
      {children}
    </div>
  )
}

export default Container
