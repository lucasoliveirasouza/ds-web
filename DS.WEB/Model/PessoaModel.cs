using System;
using System.ComponentModel.DataAnnotations;

namespace DS.WEB.Model
{
    public class PessoaModel
    {
        [Key]
        public int Codigo { get; set; }

        public string Nome { get; set; }

        public string CPF { get; set; }

        public DateTime DataNascimento { get; set; }

        public string Email { get; set; }

        public string Senha { get; set; }
    }
}
