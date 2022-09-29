using System.ComponentModel.DataAnnotations;

namespace BackEnd.CustomValidationAttribute
{
    public class CheckNewNameAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {

            if (value != null)
            {

                if (value.ToString().Length >= 3 && value.ToString().Length <= 50) return true;
                ErrorMessage =
                    $"Error: Name lenght between from 3 to 50.";

                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
