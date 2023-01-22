using System;

namespace MapacenBackend.Exceptions
{
    public class NotUniqueElementException : Exception
    {
        public NotUniqueElementException(string msg) : base(msg)
        {

        }
    }
}