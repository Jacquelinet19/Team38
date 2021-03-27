import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/Hello")
public class Servlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ArrayList<String> obj = new ArrayList<String>();
        obj.add("Hello");
        obj.add("Tyler");
        obj.add("Last");
        String jsonArray = new Gson().toJson(obj);
        response.setContentType("application/json;");
        response.getWriter().println(jsonArray);
    }
}
