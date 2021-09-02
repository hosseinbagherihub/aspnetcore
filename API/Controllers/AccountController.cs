using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context,ITokenService tokenService)
        {
            _tokenService=tokenService;
            _context=context;
        }
        
        [HttpPost("Register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDto){
            
            if(await UserExist(registerDto.username)) {
                return BadRequest("Username is taken");
            }
            
            using var hmac = new HMACSHA512();

            var  user = new AppUser(){
                UserName=registerDto.username,
                PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
                PasswordSalt=hmac.Key
            };

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return new UserDTO{
                Username= user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExist(string username){
            return await _context.Users.AnyAsync(x=>x.UserName == username.ToLower());
        }


        [HttpPost("Login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto){
            var user = await _context.Users.SingleOrDefaultAsync(x=>x.UserName == loginDto.username);

            if(user==null){
                return Unauthorized("Invalid Username ");
            }
            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash= hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));


            for (int i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i]){
                      return Unauthorized("Invalid Password ");
                }
            }
           return new UserDTO{
                Username= user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }
    }
}