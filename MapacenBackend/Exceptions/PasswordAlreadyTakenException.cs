
namespace MapacenBackend.Exceptions
{
    public class PasswordAlreadyTakenException : Exception
    {
        public PasswordAlreadyTakenException()
        {

        }
        
        public PasswordAlreadyTakenException(string msg) : base(msg)
        {

        }
    }
}