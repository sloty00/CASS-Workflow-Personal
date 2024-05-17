export const exampleController = async (req, res) => {
  try {
    const data = {
      message: 'Ejemplo de mensaje desde el controlador',
      date: new Date()
    };
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los datos de ejemplo' });
  }
}