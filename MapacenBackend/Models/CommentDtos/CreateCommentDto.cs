﻿using MapacenBackend.Entities;
using System.ComponentModel.DataAnnotations;

namespace MapacenBackend.Models.CommentDtos
{
    public class CreateCommentDto
    {
        [Required]
        [MaxLength(250)]
        [MinLength(1)]
        public string Content { get; set; }

        [Required]
        public User Author { get; set; }
    }
}