using System.ComponentModel.DataAnnotations;

namespace emes.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}