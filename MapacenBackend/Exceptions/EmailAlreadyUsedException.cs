namespace MapacenBackend.Exceptions
{
    public class EmailAlreadyUsedException : Exception
    {
        public EmailAlreadyUsedException()
        {

        }
        
        public EmailAlreadyUsedException(string msg) : base(msg)
        {

        }
    }
}