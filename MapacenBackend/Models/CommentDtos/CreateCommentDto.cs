using MapacenBackend.Entities;
using System;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.CommentDtos
{
    public class CreateCommentDto
    {
        [Required(ErrorMessage ="Pole jest wymagane")]
        [MaxLength(250, ErrorMessage = "Treść jest nie może być dłuższa niż 250 znaków")]
        [MinLength(1, ErrorMessage ="Niepoprawne dane")]
        public string Content { get; set; }

        [Required(ErrorMessage ="Pole jest wymagane")]
        public int UserId { get; set; }

        [Required(ErrorMessage ="Pole jest wymagane")]
        public int OfferId { get; set; }

        public DateTime CreationDate { get; set; } = DateTime.Now;
    }
}
