/**
 * Clase para construir características de consulta para la API
 */
class APIFeatures {
  /**
   * Constructor
   * @param {Object} query - Consulta de Mongoose
   * @param {Object} queryString - Cadena de consulta de la URL
   */
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  /**
   * Filtrar resultados
   * @returns {APIFeatures} - Instancia de APIFeatures para encadenamiento
   */
  filter() {
    // Crear copia de queryString
    const queryObj = { ...this.queryString };
    
    // Campos a excluir
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Filtrado avanzado
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  /**
   * Ordenar resultados
   * @returns {APIFeatures} - Instancia de APIFeatures para encadenamiento
   */
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      // Ordenamiento por defecto
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  /**
   * Limitar campos
   * @returns {APIFeatures} - Instancia de APIFeatures para encadenamiento
   */
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // Excluir campo __v por defecto
      this.query = this.query.select('-__v');
    }

    return this;
  }

  /**
   * Paginar resultados
   * @returns {APIFeatures} - Instancia de APIFeatures para encadenamiento
   */
  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  /**
   * Buscar por texto
   * @returns {APIFeatures} - Instancia de APIFeatures para encadenamiento
   */
  search() {
    if (this.queryString.search) {
      const searchTerm = this.queryString.search;
      this.query = this.query.find({
        $text: { $search: searchTerm }
      });
    }

    return this;
  }
}

module.exports = APIFeatures;
