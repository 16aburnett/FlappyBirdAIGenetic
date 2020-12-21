/*

    Program:     Matrix Math Library 
    Author:      Amy Burnett
    Last-Update: March 9 2019

*/

/*************************************************************************/
// Global Variables 

const SINGLE_ROW = 1;
const SINGLE_COLUMN = 0;

/*************************************************************************/
// Matrix Iterator 

class Matrix_Iterator 
{

    /*************************************************************************/

    /**
     * Constructs a matrix iterator from a given matrix 
     * @param {*} a 1. the matrix to iterate through 2. another iterator to copy from
     */
    constructor (a) 
    {
        if (a instanceof Matrix) 
        {
            this.matrix = a; 
            this.index = 0;
        }

        // Copy ctor
        else if (a instanceof Matrix_Iterator)
        {
            this.matrix = a.matrix;
            this.index = a.index;
        }
    }

    /*************************************************************************/

    /**
     * accesses or modifies the value the iterator points to 
     * @param {*} a value to assign val to (Optional)
     * @returns the value the iterator points to 
     */
    val (a) 
    {
        // modify 
        if (a)
            this.matrix.data[this.row ()][this.column ()] = a;
        return this.matrix.data[this.row ()][this.column ()];
    }

    /*************************************************************************/
 
    /**
     * Pre-increment operator
     * increments this iterator by one
     * @returns this iterator (updated)
     */
    pre_incr () 
    {
        ++this.index;
        return this; 
    }

    /*************************************************************************/
 
    /**
     * Post-increment operator
     * increments this iterator by one
     * @returns this iterator (pre-update)
     */
    post_incr () 
    {
        var temp = new Matrix_Iterator (this);
        ++this.index;
        return temp; 
    }
    
    /*************************************************************************/

    /**
     * Pre-decrement operator
     * decrements this iterator by one
     * @returns this iterator (updated)
     */
    pre_decr () 
    {
        --this.index;
        return this;
    }

    /*************************************************************************/

    /**
     * Post-decrement operator
     * decrements this iterator by one
     * @returns this iterator (pre-update)
     */
    post_decr () 
    {
        var temp = new Matrix_Iterator (this);
        --this.index;
        return temp;
    }
    
    /*************************************************************************/

    /**
     * Shift operator
     * shifts this iterator by the given value
     * @param {*} a value to shift the iterator by
     * @returns this iterator (post-update)
     */
    shift (a) 
    {
        this.index += a;
        return this;
    }
    
    /*************************************************************************/

    /**
     * Equals operator 
     * @returns true if the iterators point to the same block of data, false otherwise
     */
    equals (other) 
    {
        return this.matrix == other.matrix && this.index == other.index;
    }
    
    /*************************************************************************/

    /**
     * @returns the current row index 
     */
    row ()
    {
        return Math.floor (this.index / this.matrix.cols);
    }
    
    /*************************************************************************/

    /**
     * @returns the current column index 
     */
    column ()
    {
        return Math.floor (this.index % this.matrix.cols);
    }
    
    /*************************************************************************/
}


/*************************************************************************/
/*************************************************************************/
// Matrix Class

class Matrix 
{

    /*************************************************************************/
    /** Ctor -
    Constructs a blank (zero-valued) matrix 
    with given dimensions (row, column)
    */
    constructor (a, b) 
    {

        // Copy ctor 
        if (a instanceof Matrix) 
        {
            this.rows = a.rows;
            this.cols = a.cols;
            this.data = [];
            for (var i = 0; i < this.rows; i++) 
            {
                this.data[i] = [];
                for (var j = 0; j < this.cols; j++) 
                    this.data[i][j] = a.data[i][j];
            }

        }
        // default ctor 
        else {

            this.rows = a; 
            this.cols = b;
            this.data = [];

            // Ensure given rows and columns are valid 
            if (!this.rows || !this.cols || this.rows <= 0 || this.cols <= 0)
            {
                console.log (this.rows + " x " + this.cols + " is not a valid dimension")
                console.log ("Rows/Cols must be an integer larger than 0");
                return null;
            }

            // initialize matrix data
            for (var i = 0; i < this.rows; i++) 
            {
                this.data[i] = [];
                for (var j = 0; j < this.cols; j++) 
                    this.data[i][j] = 0;
            }

        }



        

    }

    /*************************************************************************/

    /**Allows you to assign custom data
     * @param {*} data 2D array to assign to this matrix
     * @precondition 2D array must be a valid matrix format (all rows have equal length)
     */
    setData (data) 
    {
        if (!data || !data.length) 
        {
            console.log ("data entered is not a 2 dimensional array");
            return;
        }

        // ensure the incoming data is a correct matrix 
        for (var i = 0; i < data.length; i++) 
        {
            if (data[i].length != data[0].length) 
            {
                console.log ("data entered is not a 2 dimensional array");
                return;
            }
        }

        // create matrix 
        this.rows = data.length;
        this.cols = data[0].length;
        this.data = data;

    }
    
    /*************************************************************************/

    /**
     * sets each element of the matrix to a given value
     * @param {*} a value to fill
     */
    fill (a) 
    {
        for(var i = 0; i < this.rows; i++)
            for(var j = 0; j < this.cols; j++)
            this.data[i][j] = a;
    }

    /*************************************************************************/

    /**
     * Randomly generates data [-1,1]
     */
    randomize ()
    {
        for(var i = 0; i < this.rows; i++)
            for(var j = 0; j < this.cols; j++)
                this.data[i][j] = Math.random() * 2 - 1;
    }

    /*************************************************************************/

    /**
     * @returns a copy of this matrix 
     */
    copy ()
    {
        
        // Creates new matrix 
        var newMatrix = new Matrix(this.rows, this.cols);

        // Copy data to new matrix 
        for(var i = 0; i < this.rows; i++)
        {
            for(var j = 0; j < this.cols; j++)
            {
                newMatrix.data[i][j] = this.data[i][j];
            }
        }

        return newMatrix;

    }
    
    /*************************************************************************/

    /**
     * transpose - rows become columes, columns become rows 
     * @returns the transposed matrix
     * @note this matrix is left unchanged 
     */
    transpose ()
    {
        var m = new Matrix (this.cols, this.rows);
        for (var i = 0; i < this.rows; i++)
            for (var j = 0; j < this.cols; j++)
                m.data[j][i] = this.data[i][j];
        return m;
    }

    /*************************************************************************/

    /**
     * Turns this matrix into an array (as long as there is only one column or one row)
     * @returns the matrix as an array
     */
    toArray ()
    {
        // Ensure matrix can be simplified down to an array
        // - only one column or one row
        if (this.rows != 1 && this.cols != 1)
        {
            console.log ("this matrix cannot be converted to an array");
            console.log ("must have 1 row or 1 column only");
            return null;
        }

        // Convert to array 
        // 1 row
        if (this.rows == 1)
        {
            return this.data[0];
        }

        // 1 column
        else if (this.cols == 1)
        {
            var arr = [];
            for (var i = 0; i < this.rows; i++)
            {
                arr[i] = this.data[i][0];
            }
            return arr;
        }
    }

    /*************************************************************************/

    /**
     * Converts an array into a matrix (a single column or a single row)
     * @param {*} arr the array to convert
     * @param {*} type the type of matrix - single column or single row (use SINGLE_ROW or SINGLE_COLUMN const variables)
     */
    static fromArray (arr, type)
    {
        // Ensure given arr exists and is valid 
        if (!arr || !Array.isArray (arr)) 
        {
            console.log ("Cannot convert to Matrix");
            console.log ("an array can only be converted to a matrix")
            return;
        }

        // Single Column Format 
        if (!type || type == SINGLE_COLUMN)
        {
            // Create matrix 
            var matrix = new Matrix (arr.length, 1);

            // Add data to matrix 
            for(var i = 0; i < matrix.rows; i++)
                matrix.data[i][0] = arr[i];

            return matrix;
        } 
        
        // Single Row Format
        else if (type == SINGLE_ROW)
        {
             // Create matrix 
             var matrix = new Matrix (1, arr.length);

             // Add data to matrix 
             for (var i = 0; i < matrix.cols; i++)
                 matrix.data[0][i] = arr[i];
 
             return matrix;
        }

    }

    /*************************************************************************/
    // MATRIX MATH //

    /**
     * Adds this matrix by a scalar or another matrix (element wise)
     * @param {*} n scalar value or another matrix to add to this
     * @note this matrix is affected while the other is not
     */
    add (n)
    {
        // ElementWise Addition
        if (n instanceof Matrix)
        {
            // Ensure matrices have the same dimensions
            if (n.rows != this.rows || n.cols != this.cols)
            {
               console.log ("matrices must have the same dimensions");
               console.log ("to preform elementwise addition")
               console.log ("this: " + this.rows + "x" + this.cols);
               console.log ("addend: " + n.rows + "x" + n.cols);
                return;
            }

            // Add cooresponding elements to this matrix
            for (var i = 0; i < this.rows; i++)
                for (var j = 0; j < this.cols; j++)
                    this.data[i][j] += n.data[i][j];
        }

        // Scalar Addition
        else 
        {
            for (var i = 0; i < this.rows; ++i)
                for (var j = 0; j < this.cols; ++j)
                    this.data[i][j] += n;
        }   
        return this;
    }

    /*************************************************************************/

    /**
     * Subtracts this matrix by a scalar or another matrix (element wise)
     * @param {*} n scalar value or another matrix to subract from this matrix
     */
    subtract (n) {
        // ElementWise Subtraction
        if (n instanceof Matrix) 
        {
            // Ensure matrices have the same dimensions
            if (n.rows != this.rows || n.cols != this.cols)
            {
                console.log ("matrices must have the same dimensions");
                console.log ("to preform elementwise subtraction")
                console.log ("this: " + this.rows + "x" + this.cols);
                console.log ("addend: " + n.rows + "x" + n.cols);
                return;
            }

            // subtract cooresponding elements to this matrix
            for (var i = 0; i < this.rows; i++)
                for (var j = 0; j < this.cols; j++)
                    this.data[i][j] -= n.data[i][j];
        }

        // Scalar Subtraction
        else 
        {
            for (var i = 0; i < this.rows; i++)
                for (var j = 0; j < this.cols; j++)
                    this.data[i][j] -= n;
        }   
        return this;
    }

    /*************************************************************************/

    /**
     * Multiplies this matrix by a scalar or another matrix (element wise - Hadamard Product)
     * @param {*} n scalar value or other matrix to multiply to this 
     */
    multiply (n)
    {
        // ElementWise Multiplication (Hadamard Product)
        // Note: Different from Matrix Multiplication
        if (n instanceof Matrix)
        {
            // Ensure matrices have the same dimensions
            if (n.rows != this.rows || n.cols != this.cols)
            {
               console.log ("matrices must have the same dimensions");
               console.log ("to preform elementwise multiplication")
               console.log ("this: " + this.rows + "x" + this.cols);
               console.log ("factor: " + n.rows + "x" + n.cols);
                return;
            }

            // Add cooresponding elements to this matrix
            for (var i = 0; i < this.rows; i++)
                for (var j = 0; j < this.cols; j++)
                    this.data[i][j] *= n.data[i][j];
        }

        // Scalar Multiplication
        else 
        {
            for (var i = 0; i < this.rows; i++)
                for (var j = 0; j < this.cols; j++)
                    this.data[i][j] *= n;
        }
        return this;
    }
   
    /*************************************************************************/

    /**
     * @param {*} m other matrix to test equality to this 
     * @returns whether this and the other matrix are equal or not
     */
    equals (m)
    {
        // Ensure that given matrix matches the dimensions of this matrix 
        if (m.rows != this.rows || m.cols != this.cols)
            return false;

        // Ensure data matches 
        for (var i = 0; i < this.rows; i++)
            for (var j = 0; j < this.cols; j++)
                // Returns false if elements are not equal
                if (this.data[i][j] != m.data[i][j])
                    return false;

        return true;
    }
    
    /*************************************************************************/

    /**
     * Applies a given function to each value of this matrix 
     * @param {*} f function to apply to each value of this 
     * @returns returns the mapped matrix 
     * @note this affects this matrix
     */
    map (f)
    {
        for (var i = 0; i < this.rows; i++) 
            for (var j = 0; j < this.cols; j++)
                this.data[i][j] = f(this.data[i][j]);
        return this;
    }
 
    /*************************************************************************/
    // STATIC METHODS: MATH

    /**
     * Adds together a scalar and a matrix or two matrices (element wise)
     * @param {*} a matrix to add 
     * @param {*} b scalar or matrix to add
     * @returns a matrix with the result of a + b 
     * @note neither matrix is altered
     */
    static add (a, b)
    {
        // Ensure first param 
        if (!(a instanceof Matrix))
        {
            console.log ("first param must be a matrix");
            return;
        }

        // Ensure matrix dimensions match for element wise
        if (b instanceof Matrix)
        {
            // Ensure matrices have the same dimensions
            if (b.rows != a.rows || b.cols != a.cols)
            {
                console.log ("matrices must have the same dimensions");
                console.log ("to preform elementwise addition")
                console.log ("a: " + a.rows + "x" + a.cols);
                console.log ("b: " + b.rows + "x" + b.cols);
                return;
            }
        }

        var c = new Matrix (a);
        c.add (b);
        return c;
    }

    /*************************************************************************/

    /**
     * Subtracts together a scalar and a matrix or two matrices (element wise)
     * @param {*} a matrix to subtract 
     * @param {*} b scalar or matrix to subract
     * @returns a matrix with the result of a - b 
     * @note neither matrix is altered
     */
    static subtract (a,b)
    {
        // Ensure first param 
        if (!(a instanceof Matrix))
        {
            console.log ("first param must be a matrix");
            return;
        }        

        // Ensure matrix dimensions match for element wise
        if (b instanceof Matrix)
        {
            // Ensure matrices have the same dimensions
            if (b.rows != a.rows || b.cols != a.cols)
            {
                console.log ("matrices must have the same dimensions");
                console.log ("to preform elementwise subtraction")
                console.log ("a: " + a.rows + "x" + a.cols);
                console.log ("b: " + b.rows + "x" + b.cols);
                return;
            }
        }

        var c = new Matrix (a);
        c.subtract (b);
        return c;
    }

    /*************************************************************************/

    /**
     * Multiplies together a scalar and a matrix or two matrices (element wise - Hadamard Product)
     * @param {*} a matrix to multiply 
     * @param {*} b scalar or matrix to multiply
     * @returns a matrix with the result of a * b 
     * @note neither matrix is altered
     */
    static multiply(a, b)
    {
        // Ensure params are matrices
        if (!(a instanceof Matrix))
        {
            console.log ("must input a matrix");
            return;
        }

        // Ensures matrices have matching dimensions
        if (b instanceof Matrix)
        {
            // Ensure matrices have the same dimensions
            if (b.rows != a.rows || b.cols != a.cols)
            {
                console.log ("matrices must have the same dimensions");
                console.log ("to preform elementwise multiplication")
                console.log ("a: " + a.rows + "x" + a.cols);
                console.log ("b: " + b.rows + "x" + b.cols);
                return;
            }
        }

        var c = new Matrix (a);
        c.multiply (b);
        return c;

    }

    /*************************************************************************/

    /**
     * Multiplies two given matrices together using the matrix product method 
     * @param {*} a matrix to apply product
     * @param {*} b matrix to apply product 
     * @precondition columns of 'a' must match rows of 'b'
     * @note neither 'a' nor 'b' are altered 
     */
    static product (a, b)
    {
        // Ensure given are matrices 
        if (a instanceof Matrix && b instanceof Matrix)
        {
            // Ensure Matrix Multiplication can be applied
            // - Columns of 'a' must equal rows of 'b'
            if (a.cols == b.rows)
            {
                // Create Product matrix
                // - with rows of 'a' and columns of 'b'
                var product = new Matrix (a.rows, b.cols);

                // Each row of 'a' multiplied by each column of 'b'
                for (var i = 0; i < a.rows; ++i)
                    for (var j = 0; j < b.cols; ++j)
                        // dot-product
                        // each elem in 'a's row are
                        // multiplied by cooresponding elements in 'b's column
                        // and added together 
                        for (var elem = 0; elem < a.cols; elem++)
                            product.data[i][j] += a.data[i][elem] * b.data[elem][j];
                return product;
            }
        }
    }

    /*************************************************************************/

    /**
     * Transposes the given matrix and returns it 
     * @param {*} m 
     * @note the given matrix is not altered
     */
    static transpose (m)
    {
        return m.transpose ();
    }

    /*************************************************************************/

    /**
     * Applies a given function to elements of a given matrix 
     * @param {*} m matrix to map
     * @param {*} fn function to map to matrix
     * @note original matrix is unaffected 
     */
    static map (m, fn)
    {
        return new Matrix (m).map (fn);
    }
    
    /*************************************************************************/

    /**
     * Static equals 
     * @param {*} a matrix to test equality
     * @param {*} b matrix to test equality
     * @returns whether the two matrices are equal or not
     */
    static equals (a, b) 
    {
        return a.equals(b);
    }

    /*************************************************************************/

    /**
     * @returns the element count (rows * columns)
     */
    size () 
    {
        return this.rows * this.cols;
    }

    /*************************************************************************/

    /**
     * @returns an iterator pointing to the first element of the matrix
     */
    begin () 
    {
        return new Matrix_Iterator (this);
    }

    /*************************************************************************/

    /**
     * @returns an iterator pointing to one beyond the last element of the matrix
     */
    end () 
    {
        return (this.begin ()).shift (this.size ());
    }

    /*************************************************************************/
    // PRINTING //

    /**
     * Prints the matrix to the console in a formatted way 
     */
    print () 
    {
        var output = "";
        for (var i = 0; i < this.rows; i++) 
        {
            for (var j = 0; j < this.cols; j++) 
            {
                output += this.data[i][j] + " ";
            }
            output += "\n";
        }

        console.log (output);
    }

    /*************************************************************************/


}


/*************************************************************************/
