namespace MapacenBackend.Exceptions
{
    public class InvalidLoginDataException : Exception
    {
        public InvalidLoginDataException()
        {

        }
        
        public InvalidLoginDataException(string msg) : base(msg)
        {

        }
    }
}