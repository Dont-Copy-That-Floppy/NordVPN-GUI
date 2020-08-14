#!/usr/bin/python

from tkinter import *
from tkinter.filedialog import *
from tkinter.messagebox import *
import os


class GUI:
    def __init__(self):
        top = Tk()
        self.cli = CLI()
        self.createMenuBar(top)
        top.mainloop()

    def createMenuBar(self, root):
        menubar = Menu(root)

        # create a pulldown menu, and add it to the menu bar
        filemenu = Menu(menubar, tearoff=0)
        filemenu.add_command(
            label="Open", command=lambda: askopenfilename(self.file))
        filemenu.add_command(
            label="Save", command=lambda: asksaveasfilename(self.file))
        filemenu.add_separator()
        filemenu.add_command(label="Exit", command=root.quit)
        menubar.add_cascade(label="File", menu=filemenu)

        # create more pulldown menus
        editmenu = Menu(menubar, tearoff=0)
        editmenu.add_command(label="Login", command=lambda: self.cli.login)
        editmenu.add_command(label="Logout", command=lambda: self.cli.logout)
        menubar.add_cascade(label="Edit", menu=editmenu)

        helpmenu = Menu(menubar, tearoff=0)
        message = 'Thank you for using NordVPN, the only trustable no-log vpn.\n\nGUI coded by pusaieth\nhttps://github.com/pusalieth'
        helpmenu.add_command(
            label="About", command=lambda: showinfo('About', message))
        menubar.add_cascade(label="Help", menu=helpmenu)

        # display the menu
        root.config(menu=menubar)


class CLI:
    def login(self, username, password):
        login = os.popen('nordvpn login', 'w')
        login.write('%s\n' % username)
        login.write('%s\n' % password)
        return login.read()

    def connect(self, country_code='', server_num=''):
        return os.popen('nordvpn connect %s%s' % (country_code, server_num)).read()

    def disconnect(self):
        return os.popen('nordvpn disconnect').read()

    def cybersec(self, state=False):
        return os.popen('nordvpn set cybersec %s' % 'on' if state else 'off').read()

    def killswitch(self, state=False):
        return os.popen('nordvpn set killswitch %s' % 'on' if state else 'off').read()

    def autoconnect(self, state=False, country_code='', server_num=''):
        return os.popen('nordvpn set autoconnect %s %s%s' % ('on' if state else 'off', country_code, server_num)).read()

    def notifications(self, state=False):
        return os.popen('nordvpn set notify %s' % 'on' if state else 'off').read()

    def customDNS(self, ip1='1.1.1.1', ip2='1.0.0.1'):
        return os.popen('nordvpn set dns').read()

    def protocol(self, packet_type):
        return os.popen('nordvpn set protocol %s' % packet_type).read()

    def obfuscate(self, state=False):
        return os.popen('nordvpn set obfuscate %s' % 'on' if state else 'off').read()

    def connectionType(self, **args):
        return os.popen('nordvpn set technology %s' % args).read()

    def whitelist(self, command, option, value):
        # command = add, remove
        # option = port, subnet
        # value = integer, IP_Address
        return os.popen('nordvpn whitelist %s %s %s' % (command, option, value)).read()

    def accountINFO(self):
        return os.popen('nordvpn account').read()

    def newAccount(self):
        return os.popen('nordvpn register').read()

    def rateLastConnection(self):
        return os.popen('nordvpn rate').read()

    def getSettings(self):
        settings = os.popen('nordvpn settings').read()
        settings_values = self.formatReturn(settings)
        self.settings = {}
        for setting in settings_values:
            key, value = setting.replace(' ', '').split(':')
            self.settings.update({key: value})

    def getStatus(self):
        self.status = os.popen('nordvpn status').read()[len('Status: '):]

    def getCountries(self):
        countries = os.popen('nordvpn countries').read()
        self.countries = self.formatReturn(countries)

    def getCities(self, country):
        self.cities = os.popen('nordvpn cities %s' % country).read()

    def getGroups(self):
        groups = os.popen('nordvpn groups').read()
        self.groups = self.formatReturn(groups)

    def logout(self):
        return os.popen('nordvpn logout').read()

    def help(self):
        returned = os.popen('nordvpn help').read()
        returned = self.formatReturn(returned)
        self.version = returned[1]

    def formatReturn(self, string):
        string = string.replace('\n-\n', '')
        string = string.replace('\t', ',')
        string = string.replace('\n', ',')
        strings = string.split(',')
        formatted = []
        for element in strings:
            if(element != None and element.strip() != ''):
                formatted.append(element)
        
        return formatted


if __name__ == "__main__":
    GUI()
